package com.firstproject.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firstproject.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book,Long>{

}
