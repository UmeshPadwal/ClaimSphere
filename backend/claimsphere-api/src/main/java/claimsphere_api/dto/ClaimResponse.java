package claimsphere_api.dto;

import java.time.LocalDate;

public class ClaimResponse {

    private Long id;

    private String claimNumber;

    private String policyNumber;

    private String customerName;

    private String claimType;

    private String city;

    private String status;

    private Double amount;

    private LocalDate incidentDate;

    private LocalDate reportedDate;

    public ClaimResponse() {
    }

    public ClaimResponse(
            Long id,
            String claimNumber,
            String policyNumber,
            String customerName,
            String claimType,
            String city,
            String status,
            Double amount,
            LocalDate incidentDate,
            LocalDate reportedDate) {

        this.id = id;
        this.claimNumber = claimNumber;
        this.policyNumber = policyNumber;
        this.customerName = customerName;
        this.claimType = claimType;
        this.city = city;
        this.status = status;
        this.amount = amount;
        this.incidentDate = incidentDate;
        this.reportedDate = reportedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClaimNumber() {
        return claimNumber;
    }

    public void setClaimNumber(String claimNumber) {
        this.claimNumber = claimNumber;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getClaimType() {
        return claimType;
    }

    public void setClaimType(String claimType) {
        this.claimType = claimType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getIncidentDate() {
        return incidentDate;
    }

    public void setIncidentDate(LocalDate incidentDate) {
        this.incidentDate = incidentDate;
    }

    public LocalDate getReportedDate() {
        return reportedDate;
    }

    public void setReportedDate(LocalDate reportedDate) {
        this.reportedDate = reportedDate;
    }
}