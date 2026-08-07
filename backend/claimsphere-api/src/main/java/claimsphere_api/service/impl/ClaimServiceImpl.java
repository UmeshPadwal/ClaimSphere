package claimsphere_api.service.impl;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;
import claimsphere_api.exception.ResourceNotFoundException;
import claimsphere_api.repository.ClaimRepository;
import claimsphere_api.service.ClaimService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimServiceImpl implements ClaimService {

    private final ClaimRepository claimRepository;

    public ClaimServiceImpl(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public ClaimResponse saveClaim(ClaimRequest request) {

        Claim claim = new Claim();

        claim.setClaimNumber(request.getClaimNumber());
        claim.setPolicyNumber(request.getPolicyNumber());
        claim.setStatus(request.getStatus());
        claim.setAmount(request.getAmount());

        Claim savedClaim = claimRepository.save(claim);

        return new ClaimResponse(
                savedClaim.getId(),
                savedClaim.getClaimNumber(),
                savedClaim.getPolicyNumber(),
                savedClaim.getStatus(),
                savedClaim.getAmount()
        );
    }
    @Override
    public List<ClaimResponse> getAllClaims() {

        List<Claim> claims = claimRepository.findAll();

        return claims.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ClaimResponse getClaimById(Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Claim not found with id " + id));

        return mapToResponse(claim);
    }

    @Override
    public ClaimResponse updateClaim(Long id, ClaimRequest request) {

        Claim existingClaim = claimRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Claim not found with id " + id));

        existingClaim.setClaimNumber(request.getClaimNumber());
        existingClaim.setPolicyNumber(request.getPolicyNumber());
        existingClaim.setStatus(request.getStatus());
        existingClaim.setAmount(request.getAmount());

        Claim updatedClaim = claimRepository.save(existingClaim);

        return mapToResponse(updatedClaim);
    }

    private ClaimResponse mapToResponse(Claim claim) {

        ClaimResponse response = new ClaimResponse();

        response.setId(claim.getId());
        response.setClaimNumber(claim.getClaimNumber());
        response.setPolicyNumber(claim.getPolicyNumber());
        response.setStatus(claim.getStatus());
        response.setAmount(claim.getAmount());

        return response;
    }

    @Override
    public void deleteClaim(Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Claim not found with id " + id));

        claimRepository.delete(claim);

    }

    @Override
    public List<ClaimResponse> searchClaims(String keyword) {

        return claimRepository
                .findByClaimNumberContainingIgnoreCaseOrPolicyNumberContainingIgnoreCaseOrStatusContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public Page<ClaimResponse> getClaims(Pageable pageable) {

        return claimRepository
                .findAll(pageable)
                .map(this::mapToResponse);

    }
}