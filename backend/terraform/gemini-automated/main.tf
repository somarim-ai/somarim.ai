# terraform/gemini-automated/main.tf
module "somarim_gemini_production" {
  source = "../modules/gemini-automated"
  
  domain_name    = "somarim.com"
  gemini_enabled = true
  auto_configure = true
  
  # Gemini will automatically configure these
  services = {
    medical_engine    = true
    quantum_core      = true 
    temporal_engine   = true
    god_protocol      = true
    reality_control   = true
    healing_matrix    = true
  }
  
  # Gemini-managed scaling
  auto_scaling = {
    enabled    = true
    min_size   = 1
    max_size   = 50
    gemini_ai  = true  # Gemini optimizes scaling automatically
  }
}
