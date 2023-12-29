using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Todo_App.Authentication;
using Todo_App.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// code added

builder.Services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(builder.Configuration.GetConnectionString("TodoAPP")));

// another new code

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Configure identity options if needed
    options.Password.RequiredLength = 8;
    // Add other options as needed
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();


// another new code
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:ValidIssuer"],
            ValidAudience = builder.Configuration["Jwt:ValidAudience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
        };
    });


//builder.Services.AddSingleton<JwtBearerChallengeContext>(new JwtAuthenticationManager(key))
// code end



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // new code
    app.UseCors();
    // new end
}


app.UseCors(builder =>{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
// new code
app.UseAuthentication();

app.UseAuthorization();
// new end
app.UseHttpsRedirection();

app.MapControllers();

app.Run();

