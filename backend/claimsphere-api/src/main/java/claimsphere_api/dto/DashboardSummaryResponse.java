package claimsphere_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {

    private long totalClaims;
    private long openClaims;
    private long closedClaims;
    private long pendingClaims;
    private long inProgressClaims;
    private double totalClaimAmount;

    // Generate Getters & Setters
}