"""
GuardianOC - Live Threat Stream Simulator
Simulates a live stream of employee incoming calls analyzed by VocxGuard.
Demonstrates how live voice cloning attacks dynamically alter enterprise risk in real time.
"""

import time
import requests
import random

API_URL = "http://127.0.0.1:8000/api/telemetry/ingest"

SAMPLE_CALLS = [
    {
        "caller": "+91-98200-11223 (Internal Accounts)",
        "fused_score": 0.12,
        "acoustic_score": 0.08,
        "bio_authenticity": 0.94,
        "spoof_type": "None (Genuine Human Mucosal Prosody)"
    },
    {
        "caller": "+91-98765-43210 (Spoofed CFO Number)",
        "fused_score": 0.92,
        "acoustic_score": 0.95,
        "bio_authenticity": 0.05,
        "spoof_type": "ElevenLabs / VITS Neural Vocoder Voice Clone"
    },
    {
        "caller": "+91-91234-56789 (Vendor Desk)",
        "fused_score": 0.15,
        "acoustic_score": 0.11,
        "bio_authenticity": 0.91,
        "spoof_type": "None (Verified Natural Speech Dynamics)"
    },
    {
        "caller": "+91-99887-66554 (Spoofed CEO Mobile)",
        "fused_score": 0.96,
        "acoustic_score": 0.98,
        "bio_authenticity": 0.02,
        "spoof_type": "High-Frequency Transposed Conv Aliasing (Spoofed Impersonation)"
    }
]

def stream_telemetry(interval_sec: float = 3.0):
    print("==================================================")
    print(" GuardianOC - Live VocxGuard Telemetry Streamer   ")
    print(f" Target: {API_URL}")
    print("==================================================")

    step = 0
    while True:
        call = random.choice(SAMPLE_CALLS)
        call_id = f"CALL-STREAM-{int(time.time()*1000)}"
        payload = {
            "caller": call["caller"],
            "call_id": call_id,
            "fused_score": call["fused_score"],
            "acoustic_score": call["acoustic_score"],
            "bio_authenticity": call["bio_authenticity"],
            "spoof_type": call["spoof_type"]
        }

        try:
            resp = requests.post(API_URL, json=payload, timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                mult = data.get("dynamic_threat_multiplier", 1.0)
                tot_ale = data.get("enterprise_overview", {}).get("total_ale", 0)
                threat_tag = "🚨 SPOOF ATTACK" if call["fused_score"] >= 0.70 else "✅ BONAFIDE HUMAN"
                print(f"[{threat_tag}] Caller: {call['caller']} | Threat: {call['fused_score']} | Multiplier: {mult}x | Enterprise ALE: ₹{tot_ale:,.0f}")
            else:
                print(f"Server returned status {resp.status_code}")
        except Exception as e:
            print(f"Error connecting to GuardianOC backend: {e}")

        time.sleep(interval_sec)

if __name__ == "__main__":
    stream_telemetry()
