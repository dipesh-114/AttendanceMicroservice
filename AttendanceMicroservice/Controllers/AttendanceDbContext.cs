using Microsoft.EntityFrameworkCore;

public class AttendanceDbContext : DbContext
{
    public DbSet<AttendanceRecord> AttendanceRecords { get; set; }

    public AttendanceDbContext(DbContextOptions<AttendanceDbContext> options)
        : base(options)
    {
    }
}
