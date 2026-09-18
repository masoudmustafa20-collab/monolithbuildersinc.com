Monolith Builders Inc. — V14 mobile-cache fix

V14 keeps the approved V13 desktop design and features.
Mobile fix:
- All current gallery/hero images use new unique v14 filenames so iPhone/Safari cannot reuse cached V11/V13 image URLs.
- Mobile gallery images preserve their proportions with responsive sizing and object-fit.
- Full-screen viewer keeps the image contained within the phone screen.
- Project Planner, QR code, phone, email, CSLB number, and representative-imagery disclosure remain unchanged.

Keep the existing CNAME file in GitHub. Upload the V14 root files and the V14 assets; do not delete CNAME.
