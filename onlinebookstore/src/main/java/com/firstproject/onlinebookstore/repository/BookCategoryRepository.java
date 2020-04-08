package com.firstproject.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.firstproject.onlinebookstore.entity.BookCategory;


//overriding the default rest end point
@RepositoryRestResource(collectionResourceRel="bookCategory",path="book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory,Long>{

}
