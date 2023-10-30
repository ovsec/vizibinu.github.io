import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const submitContact = async (user: any) => {
	const { data, error } = await supabase
		.from('contacts')
		.insert([{ email: user.email, name: user.name }])
		.select();
};
