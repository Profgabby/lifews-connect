import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";

export declare function createBrowserClient(url: string, key: string, options?: SupabaseClientOptions<any>): SupabaseClient<any>;
export declare function createServerClient(url: string, key: string, options?: SupabaseClientOptions<any>): SupabaseClient<any>;
