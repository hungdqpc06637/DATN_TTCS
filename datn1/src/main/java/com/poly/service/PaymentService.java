package com.poly.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poly.dto.CartDTO;
import com.poly.entity.Orders;
import com.poly.entity.Payment;
import com.poly.entity.ProductFlashsale;
import com.poly.entity.Products;
import com.poly.entity.Size;
import com.poly.repository.FlashsaleRepository;
import com.poly.repository.OrdersRepository;
import com.poly.repository.PaymentRepository;
import com.poly.repository.SizeRepository;

@Service
public class PaymentService {

	private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

	@Autowired
	private SizeRepository sizeRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	private final OrdersRepository ordersRepository;

	@Autowired
	private VNPayService vnPayService;
	
	@Autowired
	private FlashsaleRepository flashsaleRepository;

	public PaymentService(OrdersRepository ordersRepository, PaymentRepository paymentRepository) {
		this.ordersRepository = ordersRepository;
		this.paymentRepository = paymentRepository;
	}

	@Transactional
	public String createPaymentUrl(Orders order, List<CartDTO> cartDTOs) {
	    try {
	        // Tính tổng số tiền cho các sản phẩm trong giỏ hàng
	        BigDecimal amount = calculateTotalAmount(cartDTOs)
	                                .multiply(BigDecimal.valueOf(100)); // Chuyển sang đơn vị tiền tệ (đồng)

	        // Lấy phí vận chuyển từ đơn hàng
	        BigDecimal shipmentFee = Optional.ofNullable(order.getShipmentFee())
	                                .orElse(BigDecimal.ZERO)
	                                .multiply(BigDecimal.valueOf(100)); // Chuyển sang đơn vị tiền tệ (đồng)

	        // Tính tổng số tiền bao gồm phí vận chuyển
	        BigDecimal totalAmount = amount.add(shipmentFee);

	        logger.info("Order ID: {}, Product Amount: {}, Shipment Fee: {}, Total Amount: {}",
	                order.getId(), amount, shipmentFee, totalAmount);

	        // Tạo URL thanh toán thông qua VNPayService
	        String paymentUrl = vnPayService.createOrder(
	                order.getId(),
	                totalAmount.intValue(),
	                "Thanh toán đơn hàng"
	        );

	        logger.info("Generated Payment URL: {}", paymentUrl);
	        return paymentUrl;

	    } catch (Exception ex) {
	        logger.error("Error while creating payment URL: {}", ex.getMessage(), ex);
	        throw new RuntimeException("Failed to create payment URL", ex);
	    }
	}

	private BigDecimal calculateTotalAmount(List<CartDTO> cartItems) {
	    List<ProductFlashsale> currentFlashSales = flashsaleRepository.findCurrentFlashSales();
	    logger.info("Fetched {} Current Flash Sales", currentFlashSales.size());

	    return cartItems.stream()
	            .map(cartItem -> calculateItemTotal(cartItem, currentFlashSales))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	}

	private BigDecimal calculateItemTotal(CartDTO cartItem, List<ProductFlashsale> flashSales) {
	    // Lấy thông tin Size và Product
	    Size size = sizeRepository.findById(cartItem.getSize().getId())
	            .orElseThrow(() -> new RuntimeException("Size not found for ID: " + cartItem.getSize().getId()));
	    Products product = size.getProduct();

	    // Lấy giá giảm nếu có Flash Sale
	    BigDecimal productPrice = getEffectivePrice(product, flashSales);

	    // Tính tổng giá cho sản phẩm
	    BigDecimal quantity = BigDecimal.valueOf(cartItem.getQuantity());
	    BigDecimal totalForItem = productPrice.multiply(quantity).setScale(2, RoundingMode.HALF_UP);

	    logger.info("Product: {}, Quantity: {}, Unit Price: {}, Total: {}",
	            product.getName(), quantity, productPrice, totalForItem);

	    return totalForItem;
	}

	private BigDecimal getEffectivePrice(Products product, List<ProductFlashsale> flashSales) {
	    // Tìm sản phẩm có trong Flash Sale
	    for (ProductFlashsale flashsale : flashSales) {
	        if (flashsale.getProduct().getId().equals(product.getId())) {
	            // Giảm giá được tính theo tỷ lệ phần trăm
	            BigDecimal discountPercentage = flashsale.getDiscount().divide(BigDecimal.valueOf(100));
	            BigDecimal discountMultiplier = BigDecimal.ONE.subtract(discountPercentage);
	            BigDecimal discountedPrice = product.getPrice().multiply(discountMultiplier)
	                                                .setScale(2, RoundingMode.HALF_UP);

	            logger.info("Product in Flash Sale: {}, Original Price: {}, Discount: {}, Discounted Price: {}",
	                        product.getName(), product.getPrice(), flashsale.getDiscount(), discountedPrice);
	            return discountedPrice;
	        }
	    }

	    // Trả về giá gốc nếu không có Flash Sale
	    logger.info("Product not in Flash Sale: {}, Price: {}", product.getName(), product.getPrice());
	    return product.getPrice();
	}



	public List<Payment> findAll() {
		return paymentRepository.findAll();
	}

	public Payment findById(Integer id) {
		return paymentRepository.findById(id).orElse(null);
	}

	public Payment save(Payment payment) {
		return paymentRepository.save(payment);
	}

	public Payment update(Integer id, Payment payment) {
		payment.setId(id);
		return paymentRepository.save(payment);
	}

	public void delete(Integer id) {
		paymentRepository.deleteById(id);
	}
}
