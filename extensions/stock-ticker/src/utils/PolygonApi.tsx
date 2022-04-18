// https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf

// https://api.polygon.io/v2/aggs/ticker/{tickerId}/range/1/{range: 'day'/'month'/'year'}/{dateFrom}/{dateTo}?adjusted=true&sort=asc&limit=120&apiKey=mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf

// const aggregatesUrl = `https://api.polygon.io/v2/aggs/ticker/${tickerId}/range/1/${range}/${dateFrom}/${dateTo}?adjusted=true&sort=asc&limit=120&apiKey=mxAPLuUuzG8GSi3zC7e7ZZpa_ggQ5Pnf`;


ticker defails v3

{
  "results": {
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNAS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0000320193",
    "composite_figi": "BBG000B9XRY4",
    "share_class_figi": "BBG001S5N8V8",
    "market_cap": 2697440402890,
    "phone_number": "(408) 996-1010",
    "address": {
    "address1": "ONE APPLE PARK WAY",
    "city": "CUPERTINO",
    "state": "CA",
    "postal_code": "95014"
   },
   "description": "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
   "sic_code": "3571",
   "sic_description": "ELECTRONIC COMPUTERS",
   "ticker_root": "AAPL",
   "homepage_url": "https://www.apple.com",
   "total_employees": 154000,
   "list_date": "1980-12-12",
   "branding": {
    "logo_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-02-01_logo.svg",
    "icon_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-02-01_icon.png"
   },
   "share_class_shares_outstanding": 16319440000,
   "weighted_shares_outstanding": 16319441000
  },
  "status": "OK",
  "request_id": "23e2235d146b00311f95de7eb62aa528"
}
