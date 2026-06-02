<#
Simple seeding helper for Windows (PowerShell).
Usage:
  .\scripts\seed.ps1 -ConnectionString "postgresql://user:pass@host:5432/db"

This script will try to run `psql` if it's available. If not, it prints instructions to run the SQL manually.
#>

param(
  [string] $ConnectionString
)

if (-not $ConnectionString) {
  Write-Host "No connection string provided. Please provide the Postgres connection string for your Supabase DB." -ForegroundColor Yellow
  Write-Host "Example: .\scripts\seed.ps1 -ConnectionString 'postgresql://postgres:password@db.host.supabase.co:5432/postgres'"
  exit 1
}

$psql = Get-Command psql -ErrorAction SilentlyContinue
if ($psql) {
  Write-Host "psql found. Running db/seed.sql..." -ForegroundColor Green
  & psql $ConnectionString -f "db/seed.sql"
  if ($LASTEXITCODE -eq 0) { Write-Host "Seeding completed." -ForegroundColor Green } else { Write-Host "psql returned exit code $LASTEXITCODE" -ForegroundColor Red }
} else {
  Write-Host "psql not found on PATH." -ForegroundColor Yellow
  Write-Host "Open your Supabase project -> SQL Editor and run db/seed.sql, or install psql from https://www.postgresql.org/download/" -ForegroundColor Cyan
}
