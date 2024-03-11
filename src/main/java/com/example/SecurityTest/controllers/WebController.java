package com.example.SecurityTest.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;

@Controller
@RequestMapping
public class WebController {
    @GetMapping("/main")
    public String getMain(){

        return "main";
    }

//    @GetMapping("/styles/{fileName:.+}")
//    public ResponseEntity<byte[]> getCss(@PathVariable String fileName) throws IOException {
//        Resource resource = new ClassPathResource("static/styles/" + fileName);
//        byte[] css = Files.readAllBytes(resource.getFile().toPath());
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.valueOf("text/css"))
//                .body(css);
//    }

}