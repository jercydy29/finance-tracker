const monthlyData - Creating a constant variable named monthlyData

: { [key: string]: { income: number; expense: number } } - This is a TypeScript type annotation.
Let's break it down:

{
[key: string]: ...
}

- [key: string] means the keys (property names) will be strings
- These will be month names like "Jan 2024", "Feb 2024"

{ income: number; expense: number }

- Each value will be an object with two properties
- income is a number
- expense is a number

Visual example of what this will look like:
{
"Jan 2024": { income: 5000, expense: 3000 },
"Feb 2024": { income: 5500, expense: 3200 },
"Mar 2024": { income: 5000, expense: 2800 }
}

= {} - Initialize it as an empty object (we'll fill it in the next step)
