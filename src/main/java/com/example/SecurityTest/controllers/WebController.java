package com.example.SecurityTest.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.nio.file.Files;

@Controller
@RequestMapping

public class WebController {
    @GetMapping("/main")
    public String getMain(){

        return "main";
    }

    @GetMapping
    public String authPage(){

        return "authpage";
    }
    @GetMapping("/chatPage")
    public String getChatPage(){
        return "chatPage";
    }
}