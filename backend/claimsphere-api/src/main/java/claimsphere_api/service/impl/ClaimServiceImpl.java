package claimsphere_api.service.impl;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;
import claimsphere_api.exception.ResourceNotFoundException;
import claimsphere_api.repository.ClaimRepository;
import claimsphere_api.service.ClaimService;
import claimsphere_api.specification.ClaimSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
        claim.setCustomerName(request.getCustomerName());
        claim.setClaimType(request.getClaimType());
        claim.setCity(request.getCity());
        claim.setStatus(request.getStatus());
        claim.setAmount(request.getAmount());
        claim.setIncidentDate(request.getIncidentDate());
        claim.setReportedDate(request.getReportedDate());

        Claim savedClaim = claimRepository.save(claim);

        return mapToResponse(savedClaim);
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
        existingClaim.setCustomerName(request.getCustomerName());
        existingClaim.setClaimType(request.getClaimType());
        existingClaim.setCity(request.getCity());
        existingClaim.setStatus(request.getStatus());
        existingClaim.setAmount(request.getAmount());
        existingClaim.setIncidentDate(request.getIncidentDate());
        existingClaim.setReportedDate(request.getReportedDate());

        Claim updatedClaim = claimRepository.save(existingClaim);

        return mapToResponse(updatedClaim);
    }

    private ClaimResponse mapToResponse(Claim claim) {

        ClaimResponse response = new ClaimResponse();

        response.setId(claim.getId());
        response.setClaimNumber(claim.getClaimNumber());
        response.setPolicyNumber(claim.getPolicyNumber());
        response.setCustomerName(claim.getCustomerName());
        response.setClaimType(claim.getClaimType());
        response.setCity(claim.getCity());
        response.setStatus(claim.getStatus());
        response.setAmount(claim.getAmount());
        response.setIncidentDate(claim.getIncidentDate());
        response.setReportedDate(claim.getReportedDate());

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
                .findByClaimNumberContainingIgnoreCaseOrPolicyNumberContainingIgnoreCaseOrCustomerNameContainingIgnoreCaseOrClaimTypeContainingIgnoreCaseOrCityContainingIgnoreCaseOrStatusContainingIgnoreCase(
                        keyword,
                        keyword,
                        keyword,
                        keyword,
                        keyword,
                        keyword
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public Page<ClaimResponse> getClaims(

            String keyword,
            String status,
            String city,
            String claimType,
            Pageable pageable

    ) {

        Specification<Claim> specification = Specification

                .where(ClaimSpecification.hasKeyword(keyword))

                .and(ClaimSpecification.hasStatus(status))

                .and(ClaimSpecification.hasCity(city))

                .and(ClaimSpecification.hasClaimType(claimType));

        return claimRepository

                .findAll(specification, pageable)

                .map(this::mapToResponse);

    }
}