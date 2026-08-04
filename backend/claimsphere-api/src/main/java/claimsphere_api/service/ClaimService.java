package claimsphere_api.service;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;

import java.util.List;

public interface ClaimService {


    ClaimResponse saveClaim(ClaimRequest request);

    List<ClaimResponse> getAllClaims();

    ClaimResponse getClaimById(Long id);
//
//    Claim updateClaim(Long id, Claim claim);
//
//    void deleteClaim(Long id);

}