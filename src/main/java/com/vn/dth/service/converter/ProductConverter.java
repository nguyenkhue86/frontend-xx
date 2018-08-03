package com.vn.dth.service.converter;

import com.vn.dth.entity.ImageEntity;
import com.vn.dth.entity.ProductEntity;
import com.vn.dth.repository.ImageRepository;
import com.vn.dth.service.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class ProductConverter {

    @Autowired
    ImageConverter imageConverter;

    public ProductDto toDto(ProductEntity entity) {
        if (entity != null) {
            return new ProductDto(entity.getId(), entity.getName(), entity.getType(), entity.getPrice(), entity.getModifiedDate(),
                   imageConverter.toDto(entity.getImageEntity()));
        } else {
            return null;
        }
    }

    public ProductEntity toEntity(ProductDto dto) {
        if (dto != null) {
            return new ProductEntity(dto.getId(), dto.getName(), dto.getType(), dto.getPrice(), dto.getModifiedDate(),
                    imageConverter.toEntity(dto.getImageDto()));
        } else {
            return null;
        }
    }

    public List<ProductDto> toDtos(List<ProductEntity> entities) {
        List<ProductDto> productDtos = new ArrayList<>();
        if (entities != null && !entities.isEmpty()) {
            entities.forEach(entity -> productDtos.add(toDto(entity)));
            return productDtos;
        } else {
            return productDtos;
        }
    }

    public  List<ProductEntity> toEntities(List<ProductDto> dtos) {
        List<ProductEntity> productEntities = new ArrayList<>();
        if (dtos != null && !dtos.isEmpty()) {
            dtos.forEach(imageDto -> productEntities.add(toEntity(imageDto)));
            return productEntities;
        } else {
            return productEntities;
        }
    }
}
