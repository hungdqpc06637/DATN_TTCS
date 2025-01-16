package com.poly.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.poly.entity.Account;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
	// Kiểm tra email có tồn tại
	boolean existsByEmail(String email);

	// Các truy vấn khác
	@Query("SELECT acc FROM Account acc WHERE acc.username = ?1 AND acc.password = ?2")
	Account findByUsernameAndPassword(String username, String password);

	Account findByUsername(String username);

	Optional<Account> findByEmail(String email);

	@Modifying
	@Transactional
	@Query("UPDATE Account acc SET acc.password = ?1 WHERE acc.email = ?2")
	int updatePasswordByEmail(String newPassword, String email);

	@Query(value = "SELECT account.* FROM db1.orders " + "LEFT JOIN account ON orders.AccountID = account.id "
			+ "WHERE orders.id = :orderId", nativeQuery = true)
	Account findByOrderId(@Param("orderId") Integer orderId);

}
