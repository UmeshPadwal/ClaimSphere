package claimsphere_api.repository;

import claimsphere_api.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByClaimNumberContainingIgnoreCaseOrPolicyNumberContainingIgnoreCaseOrCustomerNameContainingIgnoreCaseOrClaimTypeContainingIgnoreCaseOrCityContainingIgnoreCaseOrStatusContainingIgnoreCase(

            String claimNumber,
            String policyNumber,
            String customerName,
            String claimType,
            String city,
            String status
    );

}

