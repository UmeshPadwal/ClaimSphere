package claimsphere_api.service;

import claimsphere_api.entity.Claim;

import java.util.List;

public interface ClaimService {

    Claim saveClaim(Claim claim);

    List<Claim> getAllClaims();

    Claim getClaimById(Long id);
//
//    Claim updateClaim(Long id, Claim claim);
//
//    void deleteClaim(Long id);

}