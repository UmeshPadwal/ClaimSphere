package claimsphere_api.controller;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.entity.Claim;
import claimsphere_api.service.ClaimService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:4200")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @PostMapping
    public ResponseEntity<ClaimResponse> createClaim(
            @Valid @RequestBody ClaimRequest request) {

        ClaimResponse response = claimService.saveClaim(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ClaimResponse>> getAllClaims()  {

        return ResponseEntity.ok(
                claimService.getAllClaims());

    }

    @GetMapping("/{id}")
    public ResponseEntity<ClaimResponse> getClaimById(
            @PathVariable Long id) {

        ClaimResponse response = claimService.getClaimById(id);

        return ResponseEntity.ok(response);
    }
}