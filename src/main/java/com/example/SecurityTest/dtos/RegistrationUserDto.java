package com.example.SecurityTest.dtos;


import com.example.SecurityTest.entities.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Data
public class RegistrationUserDto {
    private String username;
    private String password;
    private String confirmPassword;
    private String emails;
}
