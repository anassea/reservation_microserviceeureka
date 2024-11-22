package com.example.reservation_microservice.service;

import com.example.reservation_microservice.model.Article;
import com.example.reservation_microservice.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;
    public List<Article> getAllArticles() { return articleRepository.findAll();}
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    public List<Article> getArticlesByCategory(String category) {
        return articleRepository.findByCategory(category);
    }
    public List<String> getAllCategories() {
        return articleRepository.findAll().stream()
                .map(Article::getCategory)
                .distinct()
                .collect(Collectors.toList());
    }
}