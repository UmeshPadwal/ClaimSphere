package claimsphere_api.controller;

import claimsphere_api.entity.Claim;
import claimsphere_api.service.ClaimService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<Claim> createClaim(
            @RequestBody Claim claim) {

        Claim savedClaim = claimService.saveClaim(claim);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedClaim);
    }

    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {

        return ResponseEntity.ok(
                claimService.getAllClaims());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(
            @PathVariable Long id) {

        Claim claim = claimService.getClaimById(id);

        return ResponseEntity.ok(claim);
    }
}