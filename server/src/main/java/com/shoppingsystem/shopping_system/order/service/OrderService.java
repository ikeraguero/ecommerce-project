package com.shoppingsystem.shopping_system.order.service;

import com.shoppingsystem.shopping_system.order.dto.OrderResponse;
import com.shoppingsystem.shopping_system.order.model.Order;
import com.shoppingsystem.shopping_system.order.model.OrderItem;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    void save(Order order);
    Long countItemsInOrder(Long orderId);
    ResponseEntity<OrderResponse> findById(Long orderId);
    Order findByIdEntity(Long orderId);
    List<OrderItem> findAllOrderItems(Long orderId);
}
