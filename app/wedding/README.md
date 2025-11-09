# Wedding Invitation - UTM Parameters Guide

## How to Use

Add `?utm_source=<value>` to the URL to show specific venue information.

## Available UTM Parameters

| UTM Source | Venue | Events Shown | Date Displayed | Transport Info |
|------------|-------|--------------|----------------|----------------|
| `kerala` | Thodupuzha (Main Wedding) | All events | 13.12.2025 | Full boarding pass with VIP Love Express |
| `familyforeverpass` | Thodupuzha (Main Wedding) | All events | 13.12.2025 | Full boarding pass with VIP Love Express |
| `trivandrum` or `thiruvananthapuram` | Thiruvananthapuram | Party Dinner only | 15.12.2025 | Basic instructions |
| `pune` or `maharashtra` | Pune | Party Lunch only | 21.12.2025 | Basic instructions |
| *No parameter* | Location-based | Auto-detected | Based on location | Based on location |

## URL Examples

```
# All events with full transport details
/wedding?utm_source=kerala
/wedding?utm_source=familyforeverpass

# Trivandrum dinner only
/wedding?utm_source=trivandrum
/wedding?utm_source=thiruvananthapuram

# Pune lunch only
/wedding?utm_source=pune
/wedding?utm_source=maharashtra
```

## Default Behavior (No UTM)

When no UTM parameter is provided, the app automatically detects the user's location:

- **Users in Kerala** → Shows Trivandrum dinner
- **Users in Maharashtra** → Shows Pune lunch
- **Users elsewhere** → Shows Pune lunch (default)

## Event Details by Venue

### Kerala (Main Wedding)
- **Events**: Haldi, Sangeet, Vidhi, Meetup Dinner, Trivandrum Dinner, Pune Lunch
- **Dates**: 12th, 13th, 15th, 21st Dec 2025
- **Venue**: Nutmeg County, Muvattupuzha, Kerala

### Trivandrum (Party Dinner)
- **Events**: Party Dinner
- **Date**: 15th Dec 2025
- **Venue**: Sri Sri Ravishankar Vidya Mandir (SSRVM), Thiruvananthapuram

### Pune (Party Lunch)
- **Events**: Party Lunch
- **Date**: 21st Dec 2025
- **Venue**: Ambience Hotel, Wakad, Pune
