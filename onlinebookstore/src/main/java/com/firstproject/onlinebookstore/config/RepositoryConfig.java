package com.firstproject.onlinebookstore.config;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer{
	@Autowired
	private EntityManager entityManager;
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
	//config.exposeIdsFor(Book.class);
		
		/* you will have to call the above commented method
		 each time you want to expose the ID's of any entity
		 To expose the Ids of all the entities do below*/
		config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream()
				.map(Type::getJavaType)
				.toArray(Class[]::new));
		config.getCorsRegistry().addMapping("/**").allowedOrigins("http://localhost:4200");
		
	}
}
