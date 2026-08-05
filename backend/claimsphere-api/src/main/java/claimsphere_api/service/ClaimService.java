package claimsphere_api.service;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;

import java.util.List;

public interface ClaimService {


    ClaimResponse saveClaim(ClaimRequest request);

    List<ClaimResponse> getAllClaims();

    ClaimResponse getClaimById(Long id);

   ClaimResponse updateClaim(Long id, ClaimRequest request);

    void deleteClaim(Long id);

}