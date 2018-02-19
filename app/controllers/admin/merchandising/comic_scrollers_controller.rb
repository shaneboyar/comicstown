class Admin::Merchandising::ComicScrollersController < Admin::AdminController
  def index
    @scrollers = ComicScroller.all.paginate(page: params[:page])
  end
  def show
    @scroller = ComicScroller.find(params[:id])
  end
  def new
    @scroller = ComicScroller.new
  end
  def edit
    @scroller = ComicScroller.find(params[:id])
  end
  def update
    @scroller = ComicScroller.find(params[:id])
    @scroller.items.build(issue: Issue.find(params[:issue_id]), position: @scroller.items.count)
    respond_to do |format|
      if @scroller.save
        format.json { render json: Issue.find(params[:issue_id]), status: 200 }
      else
        format.json { render json: @scroller.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end
end
