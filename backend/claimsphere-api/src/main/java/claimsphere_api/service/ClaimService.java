package claimsphere_api.service;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClaimService {


    ClaimResponse saveClaim(ClaimRequest request);

    List<ClaimResponse> getAllClaims();

    ClaimResponse getClaimById(Long id);

   ClaimResponse updateClaim(Long id, ClaimRequest request);

    void deleteClaim(Long id);

    List<ClaimResponse> searchClaims(String keyword);

    Page<ClaimResponse> getClaims(
            String keyword,
            String status,
            String city,
            String claimType,
            Pageable pageable
    );
}