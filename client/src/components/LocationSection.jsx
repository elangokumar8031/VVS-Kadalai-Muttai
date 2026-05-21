import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import franchiseloc from '../assets/franchiseloc.svg';

const locations = [
  {
    city: "Sattur",
    address: "Main Road, Near Railway Station, Sattur, Tamil Nadu 626203",
    phone: "+91 98765 43210",
    mapLink: "https://goo.gl/maps/example1"
  },
  {
    city: "Kovilpatti",
    address: "Ettayapuram Road, Opp. Government Hospital, Kovilpatti, Tamil Nadu 628501",
    phone: "+91 98765 43211",
    mapLink: "https://goo.gl/maps/example2"
  },
  {
    city: "Tirunelveli",
    address: "Vannarpettai, Near New Bus Stand, Tirunelveli, Tamil Nadu 627003",
    phone: "+91 98765 43212",
    mapLink: "https://goo.gl/maps/example3"
  }
];

const LocationSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 relative overflow-hidden" style={{ background: '#3d1508' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-white mb-2"
          >
            Visit Our Shops
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-0.5 w-16 bg-[#f2c94c] mx-auto mb-3 origin-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center p-4"
          >
            <img
              src={franchiseloc}
              alt="Franchise Locations Map"
              className="w-full max-w-[500px] h-auto"
              style={{
                filter: 'drop-shadow(0 0 28px rgba(242,201,76,0.20))',
              }}
            />
          </motion.div>

          {/* Right Side: DaisyUI Cards */}
          <div className="space-y-2">
            {locations.map((loc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, type: 'spring', stiffness: 80 }}
                whileHover={{ scale: 1.02 }}
                className="card card-side"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderLeft: '4px solid #f2c94c',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                <div className="card-body p-2.5 gap-0.5">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Badge number */}
                      <div
                        className="badge badge-sm font-bold text-[10px]"
                        style={{
                          background: '#f2c94c',
                          color: '#3d1508',
                          borderRadius: '999px',
                          padding: '0 6px',
                          height: '16px',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="card-title text-xs font-serif text-white m-0">
                        {loc.city}
                      </h3>
                    </div>
                    <a
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${loc.city} in Google Maps`}
                      className="btn btn-ghost btn-xs"
                      style={{ color: 'rgba(255,255,255,0.4)', minHeight: 'unset', height: 'auto', padding: '4px' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '3px 0' }} />

                  {/* Address */}
                  <div className="flex items-start gap-1.5">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#f2c94c' }} />
                    <p className="text-white/75 text-[11px] leading-snug">{loc.address}</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-1.5">
                    <Phone size={10} className="flex-shrink-0" style={{ color: '#f2c94c', opacity: 0.7 }} />
                    <span className="text-white/50 text-[10px] tracking-wide">{loc.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
