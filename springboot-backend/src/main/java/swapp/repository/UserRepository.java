package swapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
