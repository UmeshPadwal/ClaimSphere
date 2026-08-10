package claimsphere_api.specification;

import claimsphere_api.entity.Claim;
import org.springframework.data.jpa.domain.Specification;

public class ClaimSpecification {

    private ClaimSpecification() {
    }

    public static Specification<Claim> hasKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null || keyword.isBlank()) {

                return cb.conjunction();

            }

            String search = "%" + keyword.toLowerCase() + "%";

            return cb.or(

                    cb.like(cb.lower(root.get("claimNumber")), search),

                    cb.like(cb.lower(root.get("policyNumber")), search),

                    cb.like(cb.lower(root.get("customerName")), search),

                    cb.like(cb.lower(root.get("claimType")), search),

                    cb.like(cb.lower(root.get("city")), search),

                    cb.like(cb.lower(root.get("status")), search)

            );

        };

    }

    public static Specification<Claim> hasStatus(String status) {

        return (root, query, cb) -> {

            if (status == null || status.isBlank()) {

                return cb.conjunction();

            }

            return cb.equal(root.get("status"), status);

        };

    }

    public static Specification<Claim> hasCity(String city) {

        return (root, query, cb) -> {

            if (city == null || city.isBlank()) {

                return cb.conjunction();

            }

            return cb.equal(root.get("city"), city);

        };

    }

    public static Specification<Claim> hasClaimType(String claimType) {

        return (root, query, cb) -> {

            if (claimType == null || claimType.isBlank()) {

                return cb.conjunction();

            }

            return cb.equal(root.get("claimType"), claimType);

        };

    }

}