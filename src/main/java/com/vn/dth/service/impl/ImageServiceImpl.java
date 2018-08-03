package com.vn.dth.service.impl;

import com.vn.dth.repository.ImageRepository;
import com.vn.dth.service.ImageService;
import com.vn.dth.service.converter.ImageConverter;
import com.vn.dth.service.dto.ImageDto;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private final Logger log = LoggerFactory.getLogger(ImageServiceImpl.class);

    private  final ImageRepository imageRepository;

    private  final ImageConverter imageConverter;

    public ImageServiceImpl(ImageRepository imageRepository, ImageConverter imageConverter) {
        this.imageRepository = imageRepository;
        this.imageConverter = imageConverter;
    }

    @Override
    public ImageDto save(ImageDto imageDto) {
        log.debug("Request to save Image: ()");
        return null;
    }

    @Override
    public List<ImageDto> findAll() {
        return null;
    }

    @Override
    public Optional<ImageDto> findOne(Long id) {
        return Optional.empty();
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<ImageDto> search(String query) {
        return null;
    }
}
