package com.poly.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dto.CartDTO;
import com.poly.dto.OrderRequestDTO;
import com.poly.entity.Account;
import com.poly.entity.Address;
import com.poly.entity.Carts;
import com.poly.entity.OrderDetails;
import com.poly.entity.Orders;
import com.poly.entity.Payment;
import com.poly.entity.ProductFlashsale;
import com.poly.entity.ProductImages;
import com.poly.entity.Products;
import com.poly.entity.ShippingMethods;
import com.poly.entity.Size;
import com.poly.repository.AccountRepository;
import com.poly.repository.AddressRepository;
import com.poly.repository.CartsRepository;
import com.poly.repository.FlashsaleRepository;
import com.poly.repository.OrderDetailsRepository;
import com.poly.repository.OrdersRepository;
import com.poly.repository.PaymentRepository;
import com.poly.repository.ShippingMethodsRepository;
import com.poly.repository.SizeRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class OrdersService {
	private static final Logger logger = LoggerFactory.getLogger(OrdersService.class);
	@Autowired
	private OrdersRepository ordersRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private ShippingMethodsRepository shippingMethodsRepository;

	@Autowired
	private OrderDetailsRepository orderDetailsRepository;

	@Autowired
	private SizeRepository sizeRepository;

	@Autowired
	private CartsRepository cartRepository;

	@Autowired
	private FlashsaleRepository flashsaleRepository;

	@Transactional
	public Orders createOrder(OrderRequestDTO orderRequest) {
		// Tạo đối tượng Orders mới
		Orders order = new Orders();
		order.setDate(LocalDateTime.now());
		order.setNote(orderRequest.getNote());
		order.setStatus(1); // 1 là trạng thái mới

		// Liên kết Account, Address, Payment, ShippingMethod
		Account account = accountRepository.findById(orderRequest.getAccountId())
				.orElseThrow(() -> new RuntimeException("Account not found"));
		Address address = addressRepository.findById(orderRequest.getAddressId())
				.orElseThrow(() -> new RuntimeException("Address not found"));
		Payment payment = paymentRepository.findById(orderRequest.getPaymentId())
				.orElseThrow(() -> new RuntimeException("Payment method not found"));
		ShippingMethods shippingMethod = shippingMethodsRepository.findById(orderRequest.getShippingMethodId())
				.orElseThrow(() -> new RuntimeException("Shipping method not found"));

		order.setAccount(account);
		order.setAddress(address);
		order.setPayment(payment);
		order.setShippingMethod(shippingMethod);

		// Lưu đơn hàng
		Orders savedOrder = ordersRepository.save(order);

		// Xử lý giỏ hàng và giảm tồn kho
		List<CartDTO> cartItems = orderRequest.getCartItems();
		for (CartDTO cartItem : cartItems) {
			logger.info("Processing cart item: {}", cartItem);

			// Lấy Size từ SizeDTO
			Size size = sizeRepository.findById(cartItem.getSize().getId())
					.orElseThrow(() -> new RuntimeException("Size not found"));

			// Kiểm tra xem size có product không
			if (size.getProduct() == null) {
				throw new RuntimeException("Product not found for size: " + size.getId());
			}

			// Tạo OrderDetail và tính toán giá
			OrderDetails orderDetail = new OrderDetails();
			orderDetail.setOrder(savedOrder);
			orderDetail.setSize(size);
			orderDetail.setQuantity(cartItem.getQuantity());

			BigDecimal price = size.getProduct().getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
			orderDetail.setPrice(price);

			// Kiểm tra tồn kho
			if (size.getQuantityInStock() < cartItem.getQuantity()) {
				throw new RuntimeException("Insufficient stock for size: " + size.getId());
			}
			size.setQuantityInStock(size.getQuantityInStock() - cartItem.getQuantity());

			// Cập nhật Size và lưu OrderDetail
			sizeRepository.save(size);
			orderDetailsRepository.save(orderDetail);
		}

		// Xóa sản phẩm khỏi giỏ hàng
		cartItems.forEach(cartItem -> deleteCartFromDatabase(cartItem.getId(), account.getId()));

		return savedOrder;
	}

	// Phương thức xóa giỏ hàng''
	@Transactional
	private void deleteCartFromDatabase(Integer id, Integer accountId) {
		System.out.println("Giá trị cartId: " + id);
		System.out.println("Giá trị accountId: " + accountId);

		Optional<Carts> cartOptional = cartRepository.findByIdAndAccountId(id, accountId);
		System.out.println("Tìm giỏ hàng: " + cartOptional);

		if (cartOptional.isPresent()) {
			cartRepository.delete(cartOptional.get());
			System.out.println("Giỏ hàng đã được xóa thành công.");
		} else {
			System.err.println("Không tìm thấy giỏ hàng với ID: " + id + " và Account ID: " + accountId);
			throw new NoSuchElementException("Không tìm thấy giỏ hàng.");
		}
	}

	@Transactional
	public List<Orders> getOrdersByAccountId(Integer accountId) {
		List<Orders> orders = ordersRepository.findByAccountId(accountId);
		if (orders.isEmpty()) {
			throw new NoSuchElementException("Không tìm thấy hóa đơn cho người dùng với ID: " + accountId);
		}

		System.out.println("Số hóa đơn tìm thấy: " + orders.size());
		for (Orders order : orders) {
			// Kiểm tra địa chỉ có phải là null không
			if (order.getAddress() == null) {
				System.out.println("Địa chỉ hóa đơn ID " + order.getId() + " là null");
				// Có thể gán một giá trị mặc định hoặc xử lý theo cách nào đó
			}

			// Lấy OrderDetails
			List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(order.getId());

			// Gán danh sách chi tiết vào đơn hàng
			for (OrderDetails detail : orderDetails) {
				if (detail != null) {
					Size size = detail.getSize();
					if (size != null) {
						Products product = size.getProduct();
						if (product != null) {
							// Kiểm tra sản phẩm có nằm trong flash sale
							ProductFlashsale flashSale = flashsaleRepository.findFlashSaleByProductId(product.getId());
							if (flashSale != null) {
								// Nếu có, tính giá mới sau khi giảm giá (giảm theo phần trăm)
								BigDecimal originalPrice = product.getPrice(); // Giá gốc của sản phẩm
								BigDecimal discountPercentage = flashSale.getDiscount(); // Phần trăm giảm giá

								// Tính giá sau khi giảm
								BigDecimal discountAmount = originalPrice.multiply(discountPercentage)
										.divide(BigDecimal.valueOf(100)); // Số tiền giảm
								BigDecimal discountedPrice = originalPrice.subtract(discountAmount); // Giá sau khi giảm

								detail.setPrice(discountedPrice); // Cập nhật giá vào chi tiết đơn hàng
							} else {
								// Nếu không có flash sale, giữ giá gốc
								detail.setPrice(product.getPrice());
							}

							// Lấy hình ảnh của sản phẩm
							List<ProductImages> images = product.getImages();
							detail.setImages(images);
						}
					}
				}
			}

			order.setOrderDetails(orderDetails); // Gán danh sách chi tiết vào đơn hàng
		}

		return orders; // Trả về danh sách đơn hàng cùng với chi tiết của chúng
	}

	@Transactional
	public List<Orders> getAllOrders() {
		List<Orders> orders = ordersRepository.findAll();
		if (orders.isEmpty()) {
			throw new NoSuchElementException("Không có đơn hàng nào trong hệ thống.");
		}

		System.out.println("Tổng số đơn hàng: " + orders.size());
		for (Orders order : orders) {
			// Kiểm tra địa chỉ
			if (order.getAddress() == null) {
				System.out.println("Địa chỉ hóa đơn ID " + order.getId() + " là null");
			}

			// Lấy danh sách OrderDetails
			List<OrderDetails> orderDetails = orderDetailsRepository.findByOrderId(order.getId());

			// Gán hình ảnh cho từng chi tiết sản phẩm
			for (OrderDetails detail : orderDetails) {
				if (detail != null) {
					Size size = detail.getSize();
					if (size != null) {
						Products product = size.getProduct();
						if (product != null) {
							// Lấy danh sách hình ảnh của sản phẩm
							List<ProductImages> images = product.getImages();
							detail.setImages(images);
						}
					}
				}
			}

			// Gán danh sách OrderDetails vào đơn hàng
			order.setOrderDetails(orderDetails);
		}

		return orders; // Trả về danh sách đơn hàng với chi tiết và hình ảnh
	}

	public int updateOrderStatusById1(int orderId, String status) {
		return ordersRepository.updateOrderStatusById(orderId, status);
	}

	public Orders updateOrderStatus(int orderId, String status) {
		// Gọi phương thức cập nhật
		int updatedCount = ordersRepository.updateOrderStatusById(orderId, status);

		if (updatedCount > 0) {
			// Nếu cập nhật thành công, lấy lại đối tượng Orders đã cập nhật
			return ordersRepository.findById(orderId)
					.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));
		} else {
			throw new EntityNotFoundException("Cập nhật thất bại, không tìm thấy đơn hàng với ID: " + orderId);
		}
	}

	// Phương thức kiểm tra sự tồn tại của order
	public boolean checkOrderExists(int orderID) {
		return ordersRepository.existsById(orderID);
	}

	public boolean checkOrderStatus(Integer id) {
		Optional<Orders> orderOptional = ordersRepository.findById(id);
		if (orderOptional.isPresent()) {
			Orders order = orderOptional.get();
			return order.getStatus() == 1; // Kiểm tra trạng thái, 1 có thể là "mới"
		}
		return false; // Đơn hàng không tồn tại
	}

	public void updateOrderStatus(Integer id, int status) {
		// Tìm đơn hàng theo ID
		Orders order = ordersRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

		// Cập nhật trạng thái
		order.setStatus(status);

		// Lưu thay đổi
		ordersRepository.save(order);
	}

	@Transactional
	public void restoreOrderStock(int orderId) {
		Orders order = ordersRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

		List<OrderDetails> orderDetails = order.getOrderDetails();
		for (OrderDetails orderDetail : orderDetails) {
			Size size = orderDetail.getSize();
			int quantity = orderDetail.getQuantity();

			size.setQuantityInStock(size.getQuantityInStock() + quantity);
			sizeRepository.save(size);
		}

		ordersRepository.save(order);
	}

	public Orders findById(Integer valueOf) {
		return ordersRepository.findById(valueOf).get();
	}

	// Phương thức đếm số lượng đơn hàng có status = 1 theo accountId
	public long countOrdersWithStatusOneByAccountId(Integer accountId) {
		return ordersRepository.countByStatusAndAccount_Id(1, accountId);
	}

	// Phương thức đếm số lượng đơn hàng có status = 3 theo accountId
	public long countOrdersWithStatusThreeByAccountId(Integer accountId) {
		return ordersRepository.countByStatusAndAccount_Id(3, accountId);
	}

	// Phương thức đếm số lượng đơn hàng có status = 5 theo accountId
	public long countOrdersWithStatusFourByAccountId(Integer accountId) {
		return ordersRepository.countByStatusAndAccount_Id(4, accountId);
	}

	public List<OrderDetails> getListOrder(int id) {
		return orderDetailsRepository.findByOrderId(id);
	}

	public Orders getOrderById(Integer id) {
		return ordersRepository.findOrderIdById(id);
	}
	
	public Account getAccountByOrder(Integer id) {
		return accountRepository.findByOrderId(id);
	}
}
