const { createClient } = require('@supabase/supabase-js');

function createBrowserClient(url, key, options = {}) {
  return createClient(url, key, options);
}

function createServerClient(url, key, options = {}) {
  return createClient(url, key, options);
}

module.exports = { createBrowserClient, createServerClient };
