package com.gd.exercisetracker.security.admin;

import com.gd.exercisetracker.security.user.User;
import com.gd.exercisetracker.security.user.UserDTO;
import com.gd.exercisetracker.security.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserService userService;

    @GetMapping("getusers")
    public ResponseEntity<List<User>> getAllusers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/update-role")
    public ResponseEntity<String> updateUserRole(@RequestParam Long userId, @RequestParam String roleName) {
        userService.updateUserRole(userId, roleName);

        return ResponseEntity.ok("User role updated");
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return new ResponseEntity<UserDTO>(userService.getUserById(id), HttpStatus.OK);
    }
}
