# TSL Tracking Helper

Static page + embeddable widget to help users copy a booking number and open the carrier’s tracking page.

## Live site
`https://<your-username>.github.io/tsl-track/`

### Link format
`https://<your-username>.github.io/tsl-track/?carrier=<CARRIER>&ref=<REF>`

Examples:
- MSC: `?carrier=MSC&ref=EBKG10149130`
- Maersk (deeplink): `?carrier=Maersk&ref=MSCU1234567`
- Hapag-Lloyd (deeplink): `?carrier=Hapag%20Lloyd&ref=1234567890`

### Google Sheets
**Clickable icon**
```gs
=ARRAYFORMULA(
  IF(LEN(R4:R)=0,"",
    HYPERLINK(
      "https://<your-username>.github.io/tsl-track/" &
      "?carrier=" & ENCODEURL(TO_TEXT(M4:M)) &
      "&ref="     & ENCODEURL(TO_TEXT(R4:R)),
      "🧭"
    )
  )
)
