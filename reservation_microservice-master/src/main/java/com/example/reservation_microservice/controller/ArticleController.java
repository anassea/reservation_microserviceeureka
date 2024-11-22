package com.example.reservation_microservice.controller;

import com.example.reservation_microservice.model.Article;
import com.example.reservation_microservice.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles() { return articleService.getAllArticles();}

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleService.saveArticle(article);
    }

    @GetMapping("/{category}")
    public List<Article> getArticlesByCategory(@PathVariable String category) { return articleService.getArticlesByCategory(category);}

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return articleService.getAllCategories();
    }
}