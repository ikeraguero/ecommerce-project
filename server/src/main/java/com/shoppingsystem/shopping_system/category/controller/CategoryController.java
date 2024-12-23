package com.shoppingsystem.shopping_system.category.controller;


import com.shoppingsystem.shopping_system.category.dto.CategoryDTO;
import com.shoppingsystem.shopping_system.category.model.Category;
import com.shoppingsystem.shopping_system.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class CategoryController {

    CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public CategoryController() {
    }

    @GetMapping("/categories")
    List<CategoryDTO> getCategories() {
        return categoryService.findAll();
    }

    @GetMapping("/categories/{categoryId}")
    Category getCategory(@PathVariable int categoryId) {
        return categoryService.findById(categoryId);
    }

    @PostMapping("/categories")
    void createCategory(@RequestBody Category category) {
        categoryService.save(category);
    }

}
