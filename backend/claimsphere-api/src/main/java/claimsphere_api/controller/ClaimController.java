package claimsphere_api.controller;

import claimsphere_api.dto.ClaimRequest;
import claimsphere_api.dto.ClaimResponse;
import claimsphere_api.service.ClaimService;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PutMapping("/{id}")
    public ResponseEntity<ClaimResponse> updateClaim(
            @PathVariable Long id,
            @Valid @RequestBody ClaimRequest request) {

        ClaimResponse response = claimService.updateClaim(id, request);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ClaimResponse>> getAllClaims()  {

        return ResponseEntity.ok(
                claimService.getAllClaims());

    }

    @GetMapping("/search")
    public ResponseEntity<List<ClaimResponse>> searchClaims(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                claimService.searchClaims(keyword));

    }

    @GetMapping("/{id}")
    public ResponseEntity<ClaimResponse> getClaimById(
            @PathVariable Long id) {

        ClaimResponse response = claimService.getClaimById(id);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(
            @PathVariable Long id) {

        claimService.deleteClaim(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/page")
    public ResponseEntity<Page<ClaimResponse>> getClaims(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) String status,

            @RequestParam(required = false) String city,

            @RequestParam(required = false) String claimType,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction

    ) {

        Sort sort = direction.equalsIgnoreCase("desc")

                ? Sort.by(sortBy).descending()

                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok(

                claimService.getClaims(
                        keyword,
                        status,
                        city,
                        claimType,
                        pageable
                )

        );

    }
}