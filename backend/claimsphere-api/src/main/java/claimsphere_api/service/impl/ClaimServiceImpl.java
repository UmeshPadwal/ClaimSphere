package claimsphere_api.service.impl;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;
import claimsphere_api.exception.ResourceNotFoundException;
import claimsphere_api.repository.ClaimRepository;
import claimsphere_api.service.ClaimService;
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
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    @Override
    public Claim getClaimById(Long id) {
        return claimRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Claim not found with id " + id));
    }
}