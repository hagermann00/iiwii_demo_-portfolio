package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok","service":"thecoil-engine"}`))
	})

	// TODO: Phase 1 — AI Concierge routes (Gemini 2.5 Flash)
	// mux.HandleFunc("POST /api/chat", api.HandleChat)

	// TODO: Phase 2 — SMS Push Engine routes (Telnyx)
	// mux.HandleFunc("POST /api/push/blast", api.HandlePushBlast)

	// TODO: Phase 3 — Lead Capture webhook
	// mux.HandleFunc("POST /api/leads", api.HandleLeadCapture)

	log.Printf("The Coil Engine starting on :%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		fmt.Fprintf(os.Stderr, "server error: %v\n", err)
		os.Exit(1)
	}
}
