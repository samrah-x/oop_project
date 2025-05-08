package com.parkingsystem.service;

import com.parkingsystem.entity.Booking;
import com.parkingsystem.entity.ParkingArea;
import com.parkingsystem.repository.BookingRepository;
import com.parkingsystem.repository.ParkingAreaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final BookingRepository bookingRepository;
    private final ParkingAreaRepository parkingAreaRepository;
    private final ParkingService parkingService;

    public Map<String, Object> getRevenueReport() {
        List<Booking> bookings = bookingRepository.findAll();
        BigDecimal totalRevenue = bookings.stream()
                .map(Booking::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> report = new HashMap<>();
        report.put("totalRevenue", totalRevenue);
        report.put("totalBookings", bookings.size());
        return report;
    }

    public Map<String, Object> getOccupancyReport() {
        List<ParkingArea> parkingAreas = parkingAreaRepository.findByIsActiveTrue();
        Map<String, Object> report = new HashMap<>();
        Map<String, Object> areaDetails = new HashMap<>();

        for (ParkingArea area : parkingAreas) {
            Map<String, Object> details = new HashMap<>();
            long availableSlots = parkingService.getAvailableSlotsCount(area);
            long totalSlots = parkingService.getTotalSlotsCount(area);
            double occupancyRate = ((double) (totalSlots - availableSlots) / totalSlots) * 100;

            details.put("totalSlots", totalSlots);
            details.put("availableSlots", availableSlots);
            details.put("occupiedSlots", totalSlots - availableSlots);
            details.put("occupancyRate", String.format("%.2f%%", occupancyRate));

            areaDetails.put(area.getName(), details);
        }

        report.put("areas", areaDetails);
        return report;
    }
}