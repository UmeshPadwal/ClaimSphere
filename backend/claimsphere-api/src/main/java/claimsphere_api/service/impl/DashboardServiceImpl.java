package claimsphere_api.service.impl;

import claimsphere_api.dto.DashboardSummaryResponse;
import claimsphere_api.entity.Claim;
import claimsphere_api.repository.ClaimRepository;
import claimsphere_api.service.DashboardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final ClaimRepository claimRepository;

    public DashboardServiceImpl(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        List<Claim> claims = claimRepository.findAll();

        long totalClaims = claims.size();

        long openClaims = claims.stream()
                .filter(c -> "OPEN".equalsIgnoreCase(c.getStatus()))
                .count();

        long closedClaims = claims.stream()
                .filter(c -> "CLOSED".equalsIgnoreCase(c.getStatus()))
                .count();

        long pendingClaims = claims.stream()
                .filter(c -> "PENDING".equalsIgnoreCase(c.getStatus()))
                .count();

        long inProgressClaims = claims.stream()
                .filter(c -> "IN_PROGRESS".equalsIgnoreCase(c.getStatus()))
                .count();

        double totalClaimAmount = claims.stream()
                .mapToDouble(Claim::getAmount)
                .sum();

        return new DashboardSummaryResponse(
                totalClaims,
                openClaims,
                closedClaims,
                pendingClaims,
                inProgressClaims,
                totalClaimAmount
        );
    }
}