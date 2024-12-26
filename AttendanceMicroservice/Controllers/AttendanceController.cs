using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly AttendanceDbContext _dbContext;

    public AttendanceController(AttendanceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    [Route("add")]
    public IActionResult AddAttendanceRecord([FromBody] AttendanceRecord record)
    {
        if (record == null || string.IsNullOrEmpty(record.StudentName) || record.Date == default)
        {
            return BadRequest("Invalid record data.");
        }

        _dbContext.AttendanceRecords.Add(record);
        _dbContext.SaveChanges();
        return Ok("Attendance record added successfully!");
    }

    [HttpGet]
    [Route("get")]
    public IActionResult GetAllRecords()
    {
        return Ok(_dbContext.AttendanceRecords.ToList());
    }
}


public class AttendanceRecord
{
    public int Id { get; set; }
    public string StudentName { get; set; }
    public DateTime Date { get; set; }
    public bool IsPresent { get; set; }
}
