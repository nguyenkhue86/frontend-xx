package com.vn.dth.service;

import com.vn.dth.service.dto.ImageDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ImageService {
    /**
     * save a Image.
     */
    ImageDto save(ImageDto imageDto);

    /**
     * Get all the images.
     * @return
     */
    List<ImageDto> findAll();

    /**
     * Get the "id" image
     * @param id
     * @return
     */
    Optional<ImageDto> findOne(Long id);

    /**
     * Delete the "id" image.
     * @param id
     */
    void delete(Long id);

    /**
     * Search for the image corresponding to the query.
     * @param query
     * @return
     */
    List<ImageDto> search(String query);
}
