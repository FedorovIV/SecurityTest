package com.example.SecurityTest.controllers;


import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class MainController {
    @GetMapping("/unsecured")
    public String unsecuredData() {
        return "index";
    }

    @GetMapping("/secured")
    public String securedDara() {
        return "Secured data";
    }

    @GetMapping("/admin")
    public String adminData() {
        return "Admin Data";
    }

    @GetMapping("/info")
    public String userData(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();

        //        return principal.getName();
    }

    @GetMapping(value = "/index")
    public String test(){
        return("""
                {
                               "username": "user",
                               "password": "123"
                }""");
    }
}
