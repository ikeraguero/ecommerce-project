package com.shoppingsystem.shopping_system.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
    private Long id;
    private Long cart_id;
    private Long product_id;
    private String product_name;
    private String category_name;
    private int quantity;
    private double price;
    private byte[] image_data;
    private String image_type;
}
