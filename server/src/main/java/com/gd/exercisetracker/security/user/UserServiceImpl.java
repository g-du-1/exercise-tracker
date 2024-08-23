package com.gd.exercisetracker.security.user;

import com.gd.exercisetracker.security.role.AppRole;
import com.gd.exercisetracker.security.role.Role;
import com.gd.exercisetracker.security.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void updateUserRole(Long userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        AppRole appRole = AppRole.valueOf(roleName);

        Role role = roleRepository.findByRoleName(appRole).orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);

        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        return convertToDto(user);
    }

    private UserDTO convertToDto(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.isEnabled(),
                user.getSignUpMethod(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate()
        );
    }

    @Override
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByUserName(username);
        
        return user.orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
}
