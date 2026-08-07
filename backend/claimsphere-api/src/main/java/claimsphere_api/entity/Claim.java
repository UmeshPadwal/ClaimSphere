package claimsphere_api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String claimNumber;

    @Column(nullable = false)
    private String policyNumber;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String claimType;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate incidentDate;

    @Column(nullable = false)
    private LocalDate reportedDate;
}